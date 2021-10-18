import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useStyles } from './BaseLayoutStyles';

export const BaseLayout: React.FC = ({ children }) => {
  const style = useStyles();

  return (
    <>
      <Modal />
      <Loader />
      <SafeAreaView style={style.layout}>{children}</SafeAreaView>
    </>
  );
};
