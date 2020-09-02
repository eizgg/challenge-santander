import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation} from "react-i18next";
const Message = ({ msg,cerveza }) => {
  const {t} = useTranslation();
  return (
    <div className='alert alert-info alert-dismissible fade show' role='alert'>
      {t(msg)}
      {cerveza}
      </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;