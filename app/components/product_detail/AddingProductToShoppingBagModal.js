import React from 'react';
import Modal from 'react-native-modal';

import Loading from '../common/Loading.js';

const AddingProductToShoppingBagModal = ({ isVisible }) => (
  <Modal
    isVisible={isVisible}
    animationInTiming={1}
    animationOutTiming={1}
    backdropOpacity={0}
  >
    <Loading />
  </Modal>
);

export default AddingProductToShoppingBagModal;