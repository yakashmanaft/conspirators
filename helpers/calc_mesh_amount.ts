import { ref, computed } from 'vue'

//
export const calcMeshAmount = (mesh_id:number, mesh_type:string, mesh_tag:string, mesh_name: string, mesh_bid: any) => {

  
  let acc = 0
  // transaction_ledger_computed?.value?.forEach((transaction: any) => {

  //   // FROM
  //   if(mesh_id === transaction.from_item_id) {
  //     if(transaction.target_item_tag === 'expenses') {
  //       acc -= transaction.from_item_qty * transaction.from_item_amount
  //     }

  //     else if (transaction.from_item_tag === 'available') {


  //       if(mesh_tag !== 'invested_loan' ) {
  //         acc -= transaction.from_item_qty * transaction.from_item_amount
  //       }

  //     }

  //     else if (transaction.from_item_tag === 'invested_project') {
  //       if(transaction.purpose.slice(0,5) === `Закуп`) {
  //         acc -= transaction.from_item_qty * transaction.from_item_amount
  //       }
  //       else if(transaction.purpose.slice(0,5) === `Транш`) {
  //         acc -= transaction.from_item_qty * transaction.from_item_amount
  //       }
  //     }
  //     else if (transaction.target_item_tag === 'invested_loan') {
  //       // if(transaction.purpose.slice(0,5) === `Выдача`) {
  //         // }
  //       if(mesh_tag === 'invested_loan' && mesh_id === transaction.target_item_id) {
  //         acc -= transaction.from_item_qty * transaction.from_item_amount
  //       }
  //     }
  //     else if (mesh_tag === 'invested_crypto') {

  //       if(mesh_id === transaction.from_item_id && transaction.from_item_tag === 'invested_crypto') {
  //         acc -= transaction.from_item_qty * transaction.from_item_amount
  //       }
  //       if(mesh_id === transaction.target_item_id && transaction.target_item_tag === 'invested_crypto') {
  //         if(transaction.purpose.slice(0,4) === `Свап`) {

  //           acc += calcCryptoPair(transaction)
  //         } else {
  //           acc += transaction.from_item_qty * transaction.from_item_amount
  //         }
  //       }
  //     }
      
  //   }
  //   // TARGET
  //   else if(mesh_id === transaction.target_item_id) {
  //     if (transaction.from_item_tag === 'income') {
  //       acc += transaction.from_item_qty * transaction.from_item_amount
  //     }
  //     else if(transaction.target_item_tag === 'available' && mesh_tag !== 'invested_loan') {
  //       acc += transaction.target_item_qty * transaction.target_item_amount
  //     }
  //     else if(transaction.target_item_tag === 'invested_project') {
  //       if(transaction.purpose.slice(0,6) === `Выдача`) {
  //         acc += transaction.target_item_qty * transaction.target_item_amount
  //       } 
  //     }
  //     else if(transaction.target_item_tag === 'invested_loan') {

  //       // EPMTY / ПУСТО
  //     }
  //     else if(transaction.target_item_tag === 'debt_loan') {
  //       if(transaction.purpose === `Погашение${mesh_name}`) {
  //         acc += transaction.target_item_qty * transaction.target_item_amount
  //       }
  //     }
  //     else if (transaction.target_item_tag === 'invested_crypto') {
        
  //       if(transaction.purpose.slice(0,6) === `Выдача`) {
  //         acc += transaction.from_item_qty * transaction.from_item_amount
  //       } 

  //     }
  //     else if (transaction.target_item_tag === 'invested_stock') {
        
  //       if(transaction.purpose.slice(0,6) === `Выдача`) {
  //         acc += transaction.from_item_qty * transaction.from_item_amount
  //       } 

  //     }
  //   }
  //   // 
  //   else if(transaction.purpose === `Доход${mesh_name}`) {
  //       acc += transaction.from_item_qty * transaction.from_item_amount
  //   }
  // })

  // return `${mesh_tag}-${mesh_type}_${mesh_id}`
  if(mesh_tag === 'debt_loan' || mesh_tag === 'invested_loan') {
    // return acc * -1
    return acc
  } else {
    return acc
  }
}