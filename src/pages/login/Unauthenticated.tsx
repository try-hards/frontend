import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

export default function AboutPage() {
    const [page, setPage] = useState<boolean>(true)

    const switchPage = () => {
        setPage(!page);
    }

    if (page) {
        return <LoginPage switchPage={switchPage}/>
    }    else {
        return <RegisterPage switchPage={switchPage}/>
    }
}
