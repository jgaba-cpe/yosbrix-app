import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../constants/Colors";

const Wave = ({ height }) => (
  <Svg
    width={Dimensions.get("screen").width}
    height={height}
    viewBox="0 -28 1440 320"
  >
    <Path
      d="M0,64L80,64C160,64,320,64,480,101.3C640,139,800,213,960,208C1120,203,1280,117,1360,74.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      fill={colors.primary80}
    />
  </Svg>
);

export default Wave;
