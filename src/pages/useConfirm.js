import { useState } from 'react';

const useConfirm = () => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: '',
    content: '',
    onConfirm: null,
    onCancel: null,
  });

  const confirm = (title, content) =>
    new Promise((resolve) => {
      setConfirmState({
        open: true,
        title,
        content,
        onConfirm: () => {
          setConfirmState((prevState) => ({ ...prevState, open: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmState((prevState) => ({ ...prevState, open: false }));
          resolve(false);
        },
      });
    });

  return { confirm, confirmState };
};

export default useConfirm;
