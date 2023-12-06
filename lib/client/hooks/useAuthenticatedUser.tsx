import { EthereumAddress } from "../../shared/types";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useEnsName, useNetwork } from "wagmi";
import { ADDRESS_ZERO } from "../constants";

interface AuthenticatedUserHook {
  loadingEnsName: boolean;
  loadingAuthenticatedUser: boolean;
  authenticatedUserEnsName: string | null;
  authenticatedUserAddress: EthereumAddress | null;
  preferredChainId: number | null;
  disconnectUser: () => void;
}

export const useAuthenticatedUser = (): AuthenticatedUserHook => {
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { data: nextAuthUser } = useSession();
  const { address, isConnected } = useAccount();
  const [preferredChainId, setPreferredChainId] = useState<number | null>(
    chain?.id ?? null
  );
  const [authenticatedAccountAddress, setAuthenticatedAccountAddress] =
    useState<EthereumAddress | null>(null);
  const [loadingAuthenticatedUser, setLoadingAuthenticatedUser] =
    useState(true);
  const {
    data: ensName,
    isLoading: loadingEnsName,
    isError: errorLoadingEnsName,
  } = useEnsName({
    address: authenticatedAccountAddress
      ? (authenticatedAccountAddress.address as `0x${string}`)
      : (ADDRESS_ZERO as `0x${string}`),
  });

  /*
    We always need to make sure not only the information
    that user is connected but ALSO that user has signed-in.
    Anyone can fake connecting their wallet as a wallet that isn't
    theirs but no one can fake signing in with a wallet that isn't theirs.

    'nextAuthUser' provides the information that user has signed-in.
    'isConnected' provides the information that user has connected his/her wallet.
  */

  useEffect(() => {
    const accountAuthenticated =
      isConnected &&
      !!nextAuthUser &&
      nextAuthUser.user.id == address?.toLowerCase();

    setAuthenticatedAccountAddress(
      accountAuthenticated && address
        ? new EthereumAddress(address.toLowerCase())
        : null
    );
    setLoadingAuthenticatedUser(false);
  }, [nextAuthUser, isConnected, address]);

  const disconnectUser = () => {
    signOut({ redirect: false }).then(() => {
      if (authenticatedAccountAddress) {
        disconnect();
      }
    });
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.ethereum) {
        window.ethereum.on("disconnect", disconnectUser);
      }
    });
  }, []);

  useEffect(() => {
    if (chain?.id && chain?.id !== preferredChainId) {
      setPreferredChainId(chain.id);
    }
  }, [chain]);

  return {
    loadingEnsName: (loadingEnsName || !ensName) && !errorLoadingEnsName,
    loadingAuthenticatedUser,
    authenticatedUserEnsName:
      loadingEnsName || errorLoadingEnsName || !ensName ? null : ensName,
    authenticatedUserAddress: authenticatedAccountAddress,
    preferredChainId,
    disconnectUser,
  };
};