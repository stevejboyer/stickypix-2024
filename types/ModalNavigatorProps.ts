import NavigationButtonConfig from './NavigationButtonConfig';

export default interface ModalNavigatorProps {
   goBack: () => void;
   navigateTo: (screenName: string) => void;
   registerRightButton: (config?: NavigationButtonConfig) => void;
}
