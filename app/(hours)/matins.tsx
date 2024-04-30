import { AText, CText, GloryBe, Hour, LText, Section, SectionTitle } from '@/components/Service';
import HourService from '@/components/Service';
import { View } from '@/components/Themed';


export class Matins extends Hour {
  constructor(date: Date) {
      super(new Date('2024-02-17T12:01:00'));
      let antiphon: React.JSX.Element;
      if (this.inAdvent()) {
        antiphon = <Advent />;
      } else if (this.in12Days()) {
        antiphon = <In12Xmas />;
      } else if (this.isTransfiguration() || this.throughBaptism()) {
        antiphon = <Transfig />;
      } else if (this.inEpiphany()) {
        antiphon = <Epiphany />;
      } else if (this.inLent()) {
        antiphon = <Lent />;
      }
      else {
        antiphon = <Section />
      }
      //super(date);
      this.title = "Morning Prayer";
      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Versicle</SectionTitle>
            <LText>Oh Lord, open my lips,</LText>
            <CText>and my mouth shall declare your praise.</CText>
            <GloryBe />
            {!this.inLent() && <AText>Alleluia! Alleluia!</AText>}
        </Section>
        {antiphon}
      </View>
    )
      this.prev = "prime";
      this.next = "terce";
  }
}

function Advent() {
  return (
    <Section>
      <SectionTitle>Antiphon</SectionTitle>
      <LText>Give glory to the coming King.</LText>
      <CText>Oh, come let us worship him.</CText>
    </Section>
  )
}

function In12Xmas() {
  return (
    <Section>
      <SectionTitle>Antiphon</SectionTitle>
      <LText>Alleluia. Unto us a child is born.</LText>
      <CText>Oh come, let us worship him. Alleluia.</CText>
    </Section>
  )
}

function Transfig() {
  return (
    <Section>
      <SectionTitle>Antiphon</SectionTitle>
      <LText>The Word was made flesh, and we beheld his glory.</LText>
      <CText>Oh, come, let us worship him.</CText>
    </Section>
  )
}

function Epiphany() {
  return (
    <Section>
      <SectionTitle>Antiphon</SectionTitle>
      <LText>Give glory to God, our light and our life.</LText>
      <CText>Oh, come, let us worship him.</CText>
    </Section>
  )
}

function Lent() {
  return (
    <Section>
      <SectionTitle>Antiphon</SectionTitle>
      <LText>The Lord is near to those who call on him.</LText>
      <CText>Oh, come, let us worship him.</CText>
    </Section>
  )
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}