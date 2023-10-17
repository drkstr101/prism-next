import { Divider, Heading, View } from '@adobe/react-spectrum';

interface SectionProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <View marginBottom="size-200">
      <Heading id={title.toLowerCase()} level={2}>
        {title}
      </Heading>
      <Divider marginBottom="size-100" />
      {children}
    </View>
  );
}
