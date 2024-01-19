import { Notification, useToaster } from 'rsuite';

export function useToast() {
 const toaster = useToaster();

 const showToast = (type, message) => {
   toaster.push(
    <Notification type={type} header={type} closable>
       {message}
     </Notification>
   );
 };

 return showToast;
}
