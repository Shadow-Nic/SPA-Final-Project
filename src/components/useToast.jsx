import { useToaster, Message } from 'rsuite';

export function useToast() {
 const toaster = useToaster();

 const showToast = (type, message) => {
   toaster.push(
    <Message showIcon type={type} closable>
    {type}: {message}
  </Message>
   );
 };

 return showToast;
}
