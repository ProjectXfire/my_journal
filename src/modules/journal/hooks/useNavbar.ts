// States
import { closingSession } from "@/modules/auth/states/AuthThunks";
import { useAppDispatch } from "@/modules/shared/store";
import { clearState, toggleSidebar } from "../states";

export const useNavbar = () => {
  //--> Hooks

  const dispatch = useAppDispatch();

  //--> Methods

  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const onLogout = () => {
    dispatch(clearState());
    dispatch(closingSession());
  };

  //--> Return properties or methods

  return {
    onToggleSidebar,
    onLogout,
  };
};
