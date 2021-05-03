import * as R from 'ramda';
import React from 'react';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

import * as Styled from './members.styled';
import { ROLE_KEYS, ROLE_NAMES } from './members.constants';

const genRoleMenu = ({ onRoleMenuClick, role }) => (
  <Styled.RoleMenu onClick={onRoleMenuClick} selectedKeys={[role]}>
    <Menu.Item key={ROLE_KEYS.ADMIN}>
      <h3>{ROLE_NAMES[ROLE_KEYS.ADMIN]}</h3>
      <p>可管理成语，申请企业认证</p>
      <CheckOutlined />
    </Menu.Item>
    <Menu.Item key={ROLE_KEYS.MEMBER}>
      <h3>{ROLE_NAMES[ROLE_KEYS.MEMBER]}</h3>
      <p>享受所有企业权益</p>
      <CheckOutlined />
    </Menu.Item>
  </Styled.RoleMenu>
);

export const getDataSource = ({ membersResp = {}, meResp = {}, onDelete, onRoleChange }) => {
  const { data = [] } = membersResp;
  const meId = meResp.data?.id;

  return data.map((item) => {
    const { id, name, role } = item;
    const isMyself = id === meId;

    const onRoleMenuClick = (e) => {
      onRoleChange({
        id,
        role: e.key,
      });
    };

    return {
      key: id,
      ...R.pick(['username', 'email'], item),
      name: (
        <Styled.Name>
          {name}
          {isMyself && <span>你自己</span>}
        </Styled.Name>
      ),
      role: (
        <Dropdown overlay={genRoleMenu({ onRoleMenuClick, role })} trigger="click">
          <Styled.Role>
            {ROLE_NAMES[role]} <DownOutlined />
          </Styled.Role>
        </Dropdown>
      ),
      operation: <Styled.Delete onClick={(e) => onDelete(id)}>{isMyself ? '退出' : '删除'}</Styled.Delete>,
    };
  });
};
