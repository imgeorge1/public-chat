import React from "react";

export default function Landing() {
  function log() {}
  return (
    <div>
      <h1>landing</h1>
      <form action={log}>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
