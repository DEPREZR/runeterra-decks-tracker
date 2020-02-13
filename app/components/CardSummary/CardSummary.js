import React from "react";
import { Card, Badge, Tooltip } from "antd";
import PropTypes from "prop-types";
import { regionsBackgroundColors, images } from "../../constants.js";
import { retrieveCardData } from "../../cardsDataHelpers";
// card: { cardCode: "01DE001", amount: 2 }
const CardSummary = ({ card }) => {
  const cardData = retrieveCardData(card.cardCode);

  return (
    <Tooltip
      title={() => <img src={images[`${card.cardCode}.png`].default} alt="" />}
      mouseEnterDelay={0}
      mouseLeaveDelay={0}
    >
      <Card
        bodyStyle={{
          padding: 0
        }}
        style={{
          borderColor: "rgb(49,45,83)"
        }}
      >
        {cardData ? (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              color: "white",
              width: 300,
              height: 26,
              paddingRight: 5,
              paddingLeft: 5,
              marginRight: 5,
              background: regionsBackgroundColors[cardData.regionRef]
            }}
          >
            <div>
              <Badge
                count={cardData.cost}
                style={{ backgroundColor: "rgb(21, 39, 86)", marginRight: 5 }}
                showZero
              />
              <span>
                <strong>{cardData.name}</strong>
              </span>
            </div>
            <div>
              <span
                style={{
                  backgroundColor: "rgb(21, 39, 86)",
                  border: "1px solid rgb(204, 173, 112)",
                  padding: 2
                }}
              >
                x{card.amount}
              </span>
            </div>
          </div>
        ) : null}
      </Card>
    </Tooltip>
  );
};

CardSummary.propTypes = {
  card: PropTypes.object.isRequired
};

export default CardSummary;
