import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Audit from './audit';
import Banner from './banner';
import Form from './form';
import { AUDIT_STATUS } from './audit/audit.constants';
import { MeContext } from '~/context';
import { SplitLayout } from '~/layouts';

const CreateOrganization = () => {
  const router = useRouter();
  const { meData, mutateMe } = useContext(MeContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(!(meData?.org || meData?.org_enroll));
  }, [meData]);

  const status = meData?.org ? AUDIT_STATUS.PASS : meData?.org_enroll?.audit_status;
  const rejectReason = meData?.org_enroll?.audit_reason;

  const resetForm = () => setShowForm(true);
  const pushOrgHome = () => router.push(`/orgs/${meData?.org?.slug}/home`);

  if (showForm) {
    return (
      <SplitLayout dividerColor={'rgba(108, 116, 150, 0.4)'} marginTop="30px" marginBottom="41px">
        <Banner />
        <Form onSubmit={mutateMe} />
      </SplitLayout>
    );
  }

  return (
    <Audit status={status} rejectReason={rejectReason} onClickResetForm={resetForm} onClickOrgHome={pushOrgHome} />
  );
};
export default CreateOrganization;
