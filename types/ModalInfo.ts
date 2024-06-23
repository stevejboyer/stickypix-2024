import { ModalType } from './enums/ModalType';

export default interface ModalInfo {
   title: string;
   view?: string;
   modalType: ModalType;
   fromTop?: boolean;
   fullScreen: boolean;
}
