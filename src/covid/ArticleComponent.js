import React from "react";
import ArticleItem from "./ArticleItem";

const ArticleComponent = () => {
  return (
    <>
      <div className="article-container">
        <div className="heading">
          <div className="heading-title">
            <span className="bar"></span>
            <h3>Coronavirus COVID-19 Pandemic</h3>
          </div>

          <h1>A year of a pandemic: our response to COVID-19 in pictures</h1>
          <div className="underline"></div>
        </div>
      </div>

      <div className="hero">
        <div className="left-side">
          <div className="left-container">
            <h3>Covid-19 Malaysia</h3>
            <iframe
              title="video"
              src="https://www.youtube.com/embed/UrAqMoxj1HY"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>
              Malaysia vs. Covid-19: #KitaJagaKita records the story of
              Malaysians of various races and religions, standing shoulder to
              shoulder against the silent enemy, Covid-19. Although we face
              various difficulties and tragedies, the spirit of unity and hope
              inspires all. .
            </p>

            <iframe
              title="content"
              src="https://covidnow.moh.gov.my/vaccinations/"
              frameBorder="0"
              width="auto"
              height="500px"
            ></iframe>
          </div>
        </div>
        <div className="hero-header">
          <div className="hero-title">
            <h6>Photo Story</h6>
            <span className="bar"></span>
            <h6>11 March 2021</h6>
          </div>

          <h5>
            On 11 March 2020, the World Health Organization declared the
            outbreak of the new coronavirus, COVID-19, a worldwide pandemic.
            Since January 2020, MSF teams around the world have been responding
            to the COVID-19 pandemic, in both countries where we've previously
            worked, and those we haven't had to work in before. Meanwhile, we
            have also ensured people still continue to have access to
            healthcare.
          </h5>
          <h5>
            Over the course of a year of a pandemic, MSF teams have worked hard
            in response in over 80 countries; here's our work in pictures.
          </h5>
          <ArticleItem></ArticleItem>
        </div>
        <div className="right-side">
          <div className="right-container">
            <h3>Related Articles</h3>
            <img
              src="https://www.gavi.org/sites/default/files/vaccineswork/2022/Header/shutterstock_1682469652_h1.jpg"
              alt=""
            />
            <p>COVID: Why some people with symptoms don't get tested</p>
            <a
              href="https://www.gavi.org/vaccineswork/covid-why-some-people-symptoms-dont-get-tested"
              target="_blank"
              rel="noreferrer"
            >
              Read More Here
            </a>

            <img
              src="https://www.gavi.org/sites/default/files/vaccineswork/2022/Header/vladimir-fedotov-YLmPK-XA1cM-unsplash_h1.jpg"
              alt=""
            />
            <p>
              Seven reasons why trying to get 'COVID over with' is a bad idea
            </p>
            <a
              href="https://www.gavi.org/vaccineswork/seven-reasons-why-trying-get-covid-over-bad-idea"
              target="_blank"
              rel="noreferrer"
            >
              Read More Here
            </a>
            <img
              src="https://www.gavi.org/sites/default/files/vaccineswork/2022/Header/annie-spratt-YIIZ4oLewg4-unsplash_h1.jpg"
              alt=""
            />
            <p>
              Can Omicron evade detection from PCR, rapid antigen or lateral
              flow tests?
            </p>
            <a
              href="https://www.gavi.org/vaccineswork/can-omicron-evade-detection-pcr-rapid-antigen-or-lateral-flow-tests"
              target="_blank"
              rel="noreferrer"
            >
              Read More Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleComponent;
