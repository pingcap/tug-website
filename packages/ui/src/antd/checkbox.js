import { css } from 'styled-components';

import * as colors from '../colors';
import * as mixins from '../mixins';

export default css`
  .ant-checkbox {
    &-wrapper {
      span:nth-child(2) {
        ${mixins.typography('p2')}
      }

      &:hover {
        .ant-checkbox {
          .ant-checkbox-inner {
            border-color: ${colors.B1};
          }
        }
      }
    }

    &-input {
      &:focus {
        & + .ant-checkbox-inner {
          border-color: ${colors.B1};
        }
      }
    }

    &.ant-checkbox-checked {
      .ant-checkbox-inner {
        border-color: ${colors.B1};
        background-color: ${colors.B1};

        &::after {
          background-color: ${colors.B1};
        }
      }

      &::after {
        border: 1px solid ${colors.B1};
      }
    }
  }
`;
