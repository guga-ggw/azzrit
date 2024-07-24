"use client";
import React, { useEffect, useState } from "react";
import CretorControlComponent from "../creatorControlComponent/CretorControlComponent";
import { useParams } from "next/navigation";
import { getTableById } from "@/actions/fetchData/dataRequests";
import { ITable } from "../CreateTableForm/TableFormComponent/tableFormType";
import { useTypeContext } from "../../tableTypeContext/TypeContext";
import { IUser } from "@/types/types";
import Image from "next/image";

const PlayerListComponent = () => {
  const [table, setTable] = useState<ITable | null>(null);
  const { tableId } = useParams();
  const {getTableUsers} = useTypeContext()
  const [players, setPlayers] = useState<IUser[]>([])


  useEffect(() => {
    const getTable = async () => {
      const table = await getTableById(tableId as string);
      if (table) {
        setTable(table as any);
      }
      const ml = await getTableUsers(table?.id);
      setPlayers(ml as any)
    };
    getTable();
  }, [tableId]);
  

  
  return (
    <div className="w-full h-screen">
      <CretorControlComponent id={table?.creatorId} />
      <div className="w-full h-full flex flex-wrap p-20 gap-12">
      {players.map((item) => (
        <div className="w-96 h-80 bg-gray-500 rounded-xl relative flex">
            <div className="w-full h-14 flex gap-2 px-5 items-start py-3">
            <Image src={item.image as string} width={1200} height={1200} alt="picture" className="rounded-full h-12 w-12" />
            </div>

        </div>
      ))}
      </div>
    </div>
  );
};

export default PlayerListComponent;