
import { transactionListConstant as tc } from '../constant/transactions-list.constant';
import axios from 'axios';

export const transactionListActions = (params, body) => {

    let data = {
        method: 'get',
        url: `https://nextar.flip.id/frontend-test`,
    }

    // let data = {
    //     method: 'post',
    //     url: `https://nextar.flip.id/frontend-test`,
    //     params: params, // UNTUK METHOD POST PARAMS,
    //     data: body // UNTUK METHOD POST BODY PAKE NYA data
    // }

    return axios(data)
        .then((res) => {
            var obj = res.data;
            var result = Object.keys(obj).map((key) => [obj[key]]);
            return result;
        }
        )
        .catch(error => {
            return dispatch({
                type: tc.ERROR,
                payload: error
            });
        });
}

// export function transactionListActions(data){
//     return (dispatch) =>{
//         dispatch ({
//             type: tc.LOADING
//         })
//         let data = {
//             method: 'get',
//             url: `https://nextar.flip.id/frontend-test`, 
//           }
//        return axios(data)
//             .then((res) => {
//                     var obj = res.data;
//                     var result = Object.keys(obj).map((key) => [obj[key]]);
//                     dispatch ({
//                         type: tc.SUCCESS,
//                         payload: result
//                     });
//                 }
//             )
//             .catch(error => {
//                 return dispatch({
//                     type   : tc.ERROR,
//                     payload: error
//                 });
//             });
//         }
// }

