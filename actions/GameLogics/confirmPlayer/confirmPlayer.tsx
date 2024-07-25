'use server'

import { db } from "@/lib/db"
import { IUser } from "@/types/types"

export const confirmRequest = async({id, tableId } : {id : string | undefined, tableId : string | undefined}) => {

    const user = await db.user.findFirst({
        where : {id}
    })

    const table = await db.table.findFirst({
        where : {id : tableId}
    })

    if(!user) return {error : "User Not Found"}

    const waitingPlayerList = [...JSON.parse(table?.waitingPlayers as string).map((item : IUser ) => item.id !== id)]


    if(JSON.parse(user.acceptedTables).includes(tableId)){
        return {message : "Already In"}
    }



    const acceptedTable = [...JSON.parse(user.acceptedTables), tableId]


    const tableUpd = await db.table.update({
        where : {id : tableId},
        data : {
            waitingPlayers : JSON.stringify(waitingPlayerList as any)
        }
    })

    const userUp = await db.user.update({
        where : {id},
        data : {
            acceptedTables : JSON.stringify(acceptedTable)
        }
    })

    return {sucess : "User Accepted"}
}