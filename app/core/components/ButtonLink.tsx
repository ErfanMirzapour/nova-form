import { Button, ButtonProps } from '@chakra-ui/react';
import { Link, RouteUrlObject } from 'blitz';

interface Props {
   href: RouteUrlObject | string;
}

const ButtonLink = ({ href, children, ...props }: Props & ButtonProps) => (
   <Link href={href} passHref>
      <Button as='a' {...props}>
         {children}
      </Button>
   </Link>
);

export default ButtonLink;
