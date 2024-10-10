import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Signed Out!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSignOut = () => {
    mutate();
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-blue-600 p-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
