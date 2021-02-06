import { Slug, Fade } from "mauerwerk";
import { CloseOutlined } from "@material-ui/icons";
import InfoCard from "./InfoCard";

// https://codesandbox.io/embed/0582jolnl

export const Cell = ({
  toggle,
  episodeName,
  image,
  maximized,
  summary,
  series,
  airDate,
  url,
  season,
  number,
}) => {
  return (
    <div
      className="cell"
      style={{
        backgroundImage: `url(${image})`,
        cursor: !maximized ? "pointer" : "auto",
      }}
      onClick={!maximized ? toggle : undefined}
    >
      <Fade show={maximized} delay={maximized ? 400 : 0}>
        <div className="details">
          <Slug delay={200}>
            <div className="close">
              <CloseOutlined style={{ cursor: "pointer" }} onClick={toggle} />
            </div>
            <InfoCard
              title={episodeName}
              summary={summary}
              series={series}
              airDate={airDate}
              url={url}
              season={season}
              number={number}
            />
          </Slug>
        </div>
      </Fade>
      <Fade
        show={!maximized}
        from={{ opacity: 0, transform: "translate3d(0,140px,0)" }}
        enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
        leave={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
        delay={maximized ? 0 : 200}
      >
        <div className="default">{episodeName}</div>
      </Fade>
    </div>
  );
};
