import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const DownArrow = (props: SvgProps) => (
  <Svg width={20} height={35} fill="none" {...props}>
    <Path
      fill="#858585"
      d="M4.5 1a.5.5 0 0 0-1 0h1Zm-.854 33.354a.5.5 0 0 0 .708 0l3.182-3.182a.5.5 0 1 0-.708-.707L4 33.293l-2.828-2.828a.5.5 0 1 0-.708.707l3.182 3.182ZM3.5 1v33h1V1h-1Z"
    />
  </Svg>
);

export default DownArrow;
