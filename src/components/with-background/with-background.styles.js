import styled from "styled-components/native";

export const Background = styled.ImageBackground.attrs({
  source: require("../../../assets/home.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const CompactImage = styled.Image`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
`;
