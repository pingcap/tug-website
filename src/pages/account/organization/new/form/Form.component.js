import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form as AntForm, Checkbox, Col, Alert, Divider } from 'antd';
import * as Styled from './form.styled';
import data from './form.data';
import { Link } from '@tidb-community/ui';
import BasicFields from './fields/BasicFields.component';
import VerificationFields from './fields/VerificationFields.component';

const { verificationType, agreements, submitBtnTitle } = data.form;

const Form = ({ submit }) => {
  const [form] = AntForm.useForm();
  const [verificationTypeValue, setVerificationTypeValue] = useState();

  const [submitting, setSubmitting] = useState(false);

  const onFormValuesChange = (formData) => {
    const { [verificationType.name]: newVerificationTypeValue } = formData;
    if (newVerificationTypeValue !== undefined && newVerificationTypeValue !== verificationTypeValue) {
      setVerificationTypeValue(newVerificationTypeValue);
    }
  };

  const onSubmit = (formData) => {
    setSubmitting(true);
    submit(formData)
      .finally(() => {
        setSubmitting(false);
      });
  };

  const initialValues = {
    [agreements.name]: false,
    [verificationType.name]: verificationType.choices[0].value,
  };

  return (
    <Styled.FormContainer>
      <Styled.FormTitleContainer>
        <Col>
          <Styled.FormTitle>企业会员认证</Styled.FormTitle>
        </Col>
        <Col>
          <Styled.ContactUsButton type='link' size='small'>
            联系我们
          </Styled.ContactUsButton>
        </Col>
      </Styled.FormTitleContainer>
      <AntForm form={form} initialValues={initialValues} onValuesChange={onFormValuesChange} onFinish={onSubmit}>
        <BasicFields />
        <VerificationFields type={verificationTypeValue} />
        <AntForm.Item name={agreements.name} valuePropName='checked'>
          <Checkbox>
            {agreements.prefixText}
            <Link href={agreements.sla.link}>{agreements.sla.title}</Link>
            <Link href={agreements.privacy.link}>{agreements.privacy.title}</Link>
          </Checkbox>
        </AntForm.Item>
        <Styled.FullWidthButton type='primary' htmlType='submit' loading={submitting}>
          {submitBtnTitle}
        </Styled.FullWidthButton>
      </AntForm>
    </Styled.FormContainer>
  );
};

Form.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default Form;