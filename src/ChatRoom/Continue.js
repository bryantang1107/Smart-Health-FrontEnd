import React from "react";

const Continue = ({ history, roomz }) => {
  return (
    <>
      <div class="wrapper">
        <form action="#" class="card-content">
          <div class="container">
            <div class="image">
              <i class="fas fa-envelope"></i>
            </div>
            <p>Oops Seems Like You Are leaving the room !</p>

            <button
              onClick={() => {
                history.goBack();
              }}
              className="continue-btn"
            >
              Go Back To Room
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Continue;
