"use client";
import Usernav from "@/app/elements/user/UserNav";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CreateModal from "../tableModalComponent/TableModal";
import { deleteUserTableId } from "@/actions/GameLogics/deletePlayerFromTable/deletePlayer";
import { useSession } from "next-auth/react";
import { useTypeContext } from "../../tableTypeContext/TypeContext";
import TableCardElement from "../tableComponent/TableCard";
import FilterTableComponent from "../filterComponent/FilterTable";
import { Toaster } from "sonner";
import { pusherClient } from "@/lib/pusher";
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { getUserById } from "@/actions/fetchData/dataRequests"; // Import the getUserById function

const GamePageComponent = () => {
  const { defineType, type, Tables, fetchData } = useTypeContext();
  const session = useSession();
  const [tab, setTab] = useState<ITable[]>([]);

  useEffect(() => {
    pusherClient.subscribe("mafia-city");
    fetchData();

    const deleteTableId = async (id: string) => {
      const res = await deleteUserTableId(id);
    };

    if (session.data?.user.id) {
      deleteTableId(session.data.user.id);
    }

    pusherClient.bind("tables", async (data: ITable[]) => {
      const enhancedTables = await Promise.all(
        data.map(async (table) => {
          const creator = await getUserById(table.creatorId);
          return { ...table, creator };
        })
      );
      setTab(enhancedTables as any);
    });

    return () => {
      pusherClient.unsubscribe("mafia-city");
      pusherClient.unbind("tables");
    };
  }, [session.data?.user]);

  return (
    <div
      className="w-full min-h-screen relative flex flex-col items-center py-9"
      id="MainPage"
    >
      {type === "Create Table" && <CreateModal type={"FORM"} />}
      <Link href={"/landing"} className="text-white absolute top-5 left-5">
        Go Back
      </Link>
      <Usernav />
      <FilterTableComponent />
      <div className="w-full min-h-screen flex flex-wrap gap-12 px-10 py-28 items-center justify-center">
        {(tab.length > 0 ? tab : Tables)?.map((item, i: number) => (
          <TableCardElement index={i} item={item} key={i} />
        ))}
        <Toaster />
      </div>
    </div>
  );
};

export default React.memo(GamePageComponent);
