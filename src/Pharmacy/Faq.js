import React from "react";
import "./external.css";

const Faq = ({ category, shortname }) => {
  return (
    <>
      {category ? (
        <ol className="gradient-list">
          <li>
            <h3>
              I Forgot to take {shortname} on a specific day. What should I do?
            </h3>

            <br></br>
            <p className="modal-description">
              If you have forgotten to take/use one dose of your med, please
              take the prescribed dose as soon as you remember. If it is nearing
              the time for next dosage, ignore the initial dose that you have
              forgotten. Avoid taking both dosages in the same time to avoid
              overdosing the drug.
            </p>
          </li>
          <li>
            <h3>
              I used over the {shortname} medication from the recommended
              quantities. What steps should I take?
            </h3>

            <br></br>
            <p className="modal-description">
              If you have overdosed on {shortname}, please consult a doctor
              fast. Taking a drug more that needed might cause unwanted side
              effects.
            </p>
          </li>
          <li>
            <h3>Is it safe to take {shortname} during pregnancy?</h3>
            <br></br>
            <p className="modal-description">
              There is not enough information regarding the usage of
              {shortname} during pregnancy. Please consult your obstetrician
              before taking this medication.
            </p>
          </li>
          <li>
            <h3>Can I drive a vehicle when taking {shortname}?</h3>
            <br></br>
            <p className="modal-description">
              It is not advisable to drive after taking this medication as it
              may cause several unwanted side effects such as dizziness and
              blurred vision. However you are encouraged to talk to your doctor
              as a precautionary step.
            </p>
          </li>
          <li>
            <h3>Does drug use {shortname} lead to addiction?</h3>
            <br></br>
            <p className="modal-description">
              Please read the provided info on the packaging of the medication
              for further information.
            </p>
          </li>
        </ol>
      ) : (
        <ol className="gradient-list">
          <li>
            <h3>What should i do when i missed a does of {shortname}?</h3>
            <br></br>
            <p className="modal-description">
              If you have missed a dose by chance, try to use it as soon as
              possible when you notice. If the time to your next dosage is
              close, simply skip the medicine. In such cases, try to not double
              the dosage.
            </p>
          </li>
          <li>
            <h3>
              I think I have accidentally overdosed from the prescribed quantity
              of {shortname}. Do I need to see a doctor?
            </h3>
            <br></br>
            <p className="modal-description">
              If you feel that you might have used more than the prescribed
              quantity of {shortname}, please talk to a physician immediately as
              overdosage more than the prescribed quantity might lead to
              undesirable side-effects.
            </p>
          </li>
          <li>
            <h3>
              Will the use of {shortname} affect the child that I am bearing?
            </h3>
            <br></br>
            <p className="modal-description">
              There is lack of information about the usage of
              {shortname} during pregnancy. You’re advised to consult an
              obstetrician for detailed information before start using this
              drug. Pregnant women can weigh the pros and cons of the drug with
              the help of a Doctor before it is used.
            </p>
          </li>
          <li>
            <h3>What should I do if I mistakenly used an expired dose of</h3>
            {shortname}?<br></br>
            <p className="modal-description">
              Using an expired dose of {shortname} by accident might not be
              harmful but do consult your physician for advice just to be safe
              in this matter.
            </p>
          </li>
          <li>
            <h3>Is it alright to use other creams while using {shortname}?</h3>
            <br></br>
            <p className="modal-description">
              There may be a risk of drug-drug interaction if you use other
              creams while using {shortname} especially if those creams contain
              corticosteroids. It may increase your risk of side-effects from
              excessive corticosteroid use. It is advisable for you to inform
              your physician about all the current medications as well
              supplements that you are currently taking before using this
              medicine.
            </p>
          </li>
        </ol>
      )}
    </>
  );
};

export default Faq;
