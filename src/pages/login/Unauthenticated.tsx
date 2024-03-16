import { useUserStore } from '@/stores/useUserStore';
import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export default function AboutPage() {
  const [page, setPage] = useState<boolean>(true);

  const { login } = useUserStore();

  const switchPage = () => {
    setPage(!page);
  };

  const onLogin = () => {
    login('John Doe');
  };

  if (page) {
    return <LoginPage onLogin={onLogin} switchPage={switchPage} />;
  } else {
    return <RegisterPage switchPage={switchPage} />;
  }
}
