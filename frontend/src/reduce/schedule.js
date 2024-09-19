import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const useSchedule=create(
    persist(


    (set)=>({
    
    listSchedule:[],
    isEdit:false,
    day:0,
    addSchedule:(schedule)=>{
        set((state)=>(
            {
             listSchedule:[...state.listSchedule,schedule],
             day:state.day+1
            }
        ))
    },
    removeSchedule:(id)=>{
        set(state=>({listSchedule:state.listSchedule.filter(schedule=>schedule.id !== id )}))
    },
    editSchedule:(scheduleEdit)=>{
        console.log(scheduleEdit);
        set(state=>({
         
            listSchedule:state.listSchedule.map(schedule=>{
                if(schedule.id === scheduleEdit.id){
                    return {...schedule,from:scheduleEdit.updateFrom,to:scheduleEdit.updateTo,isAvailable:scheduleEdit.updateIsAvailable}
                }else{
                    return {...schedule}
                }
            }),
        }))
    }
}),
{
    name:'scheduleStorage'
}

)    
)