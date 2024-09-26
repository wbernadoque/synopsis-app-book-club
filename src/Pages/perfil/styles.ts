import styled from 'styled-components';
import { Colors } from '../../styles/global';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  errorPassword?: boolean;
}
export const ContainerPage = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${Colors.backgroundDark};
  /* position: relative;
  padding-top: 32px; */
`;

export const PhotoCont = styled(View)`
  align-items: center;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 32px;
  padding: 16px;
  width: 100%;
  height: 200px;
  margin-bottom: 42px;
`;

export const PhotoNameInfo = styled(View)`
  align-items: center;
  justify-content: center;
  /* position: relative; */
  display: flex;
  padding-top: 32px;
  padding: 16px;
  width: 80%;
  height: 100%;
`;

export const UserImg = styled(Image)`
  height: 96px;
  width: 96px;
  border-radius: 90px;
  margin: 0 auto;
  position: relative;
`;

export const EditImg = styled(Image)`
  align-self: center;
  height: 24px;
  width: 24px;
  position: absolute;
  top: 65px;
  right: 105px;
`;

export const UserName = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: ${Colors.whiteText};
  margin-top: 8px;
  line-height: 32px;
`;

export const UserInfos = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 160px;
  width: 90%;
  height: 300px;
  padding: 16px;
  background-color: ${Colors.backgroundDarkSecondary};
  border-radius: 12px;
`;

export const ContInfoUsuario = styled(View)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 4px auto;
  left: 0;
  position: relative;
  padding: 6px 0px;
`;

export const WrapNomeUsuario = styled(View)`
  display: flex;
  flex: 2;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

export const LabelInfoPerfil = styled(Text)`
  color: ${Colors.greyInfo};
  font-size: 14px;
  line-height: 16px;
`;

export const NomeUsuario = styled(Text)`
  color: ${Colors.whiteText};
  font-size: 16px;
  line-height: 22px;
`;

export const BtnEdit = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${Colors.whiteSecondary};
  border-radius: 48px;
  width: 80px;
  height: 30px;
`;
export const TextBtn = styled(Text)`
  color: ${Colors.whiteText};
  font-size: 14px;
  line-height: 16px;
`;
export const BtnSair = styled(View)`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  align-self: center;
  position: absolute;
  left: 0;
  bottom: 65px;
`;

export const BtnExcluir = styled(TouchableOpacity)`
  width: 90%;
  height: 48px;
  background: transparent;
  flex-direction: row;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  align-self: center;
  position: absolute;
  left: 0;
  bottom: 0px;
`;

export const TextExcluir = styled(Text)`
  color: ${Colors.textError};
  font-size: 14px;
  line-height: 16px;
  font-family: 'Inter_600SemiBold';
`;

export const TrashCan = styled(Image)`
  width: 14px;
  height: 18px;
  margin: 0 15px;
`;

export const ModalView = styled(View)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: 60px;
  width: 100%;
  height: 280px;
  padding: 28px;
  background-color: ${Colors.backgroundDarkSecondary};
  border-radius: 24px;
`;

export const ModalTitle = styled(Text)`
  color: ${Colors.whiteText};
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  margin: 22px 0px;
`;

export const ModalText = styled(Text)`
  color: ${Colors.grey};
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`;

export const ModalContBtn = styled(View)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 22px;
`;

export const BtnConfirmaExcluir = styled(TouchableOpacity)`
  width: 50%;
  height: 32px;
  background: ${Colors.primary};
  flex-direction: row;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;

export const RemoveCircle = styled(Image)`
  width: 40px;
  height: 40px;
  margin-top: 20px;
`;
