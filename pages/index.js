import { useUser } from "@web3sdks/react";
import { ConnectWallet } from "@web3sdks/react";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.connect}>
        <ConnectWallet
          auth={{
            loginOptional: false,
          }}
        />
      </div>
      {user && <p>You are signed in as {user.address}</p>}
    </div>
  );
};

export default Home;
