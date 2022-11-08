import React from "react";
import './tuits.css';
import Tuit from "./tuit";

const Tuits = ({ tuits = [] }) => {
  return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit =>
            <Tuit key={tuit._id}
              tuit={tuit} />)
        }
      </ul>
    </div>
  );
}

// function Tuits({tuits = [], deleteTuit}) {
//     return (
//     <div>
//       <ul className="ttr-tuits list-group">
//         {
//           tuits.map && tuits.map(tuit => {
//             return (
//               <Tuit key={tuit._id} deleteTuit={deleteTuit} tuit={tuit}/>
//             );
//           })
//         }
//       </ul>
//     </div>
//   );
// }

export default Tuits;