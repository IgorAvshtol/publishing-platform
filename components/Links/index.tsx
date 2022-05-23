import { Link } from './Link';
import { nanoid } from 'nanoid';

export const links = [
  { name: 'Help' },
  { name: 'Status' },
  { name: 'Writers' },
  { name: 'Blog' },
  { name: 'Careers' },
  { name: 'Privacy' },
  { name: 'Terms' },
  { name: 'About' },
  { name: 'Knowable' },
];

export function Links() {
  return (
      <>
        {links.map((link) => (
            <Link key={nanoid()} link={link.name}/>
        ))}
      </>
  );
}