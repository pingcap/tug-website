import React, { useContext } from 'react';

import Form from './form';
import Layout from '~/pages/my/layout';
import { AuthContext, MeContext } from '~/context';
import { PageLoader } from '~/components';
import { getI18nProps } from '~/utils/i18n.utils';

export const getServerSideProps = async (ctx) => {
  const i18nProps = await getI18nProps(['common'])(ctx);

  return {
    props: {
      ...i18nProps,
    },
  };
};

const Page = () => {
  const { login, isAnonymous } = useContext(AuthContext);
  const { meData } = useContext(MeContext);

  if (isAnonymous) {
    login();
    return null;
  }

  if (!meData) {
    return <PageLoader />;
  }

  return (
    <Layout title="个人信息">
      <Form />
    </Layout>
  );
};

export default Page;
