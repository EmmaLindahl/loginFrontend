import { useState } from "react";

const Note = () =>{

    const [closedNote, setClosedNote] = useState(false)

return<>
<div className="warning">
 <p><span className="noteHeading">
          <span role="img" aria-label="warning">⚠️</span>
          <strong>Note:</strong>
        </span> <br/>The backend is hosted on Render, which may cause a delay (up to 50 seconds) if the app has been idle.
<br/>This is a normal behavior of the hosting service — not an issue with the app itself.</p>
</div>
</>
};

export default Note;