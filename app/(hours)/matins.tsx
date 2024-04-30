import { AText, CText, GloryBe, Hour, LText, Section, SectionTitle, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View } from '@/components/Themed';


export class Matins extends Hour {
  constructor(date: Date) {
      super(new Date('2024-02-17T12:01:00'));
      //super(date);

      let antiphon: React.JSX.Element[];
      if (this.inAdvent()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Give glory to the coming King.</LText>,
          <CText key={randstr('antiphon')}>Oh, come let us worship him.</CText>
        ];
      } else if (this.in12Days()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Alleluia. Unto us a child is born.</LText>,
          <CText key={randstr('antiphon')}>Oh come, let us worship him. Alleluia.</CText>
        ];
      } else if (this.isTransfiguration() || this.throughBaptism()) {
        antiphon = [
          <LText key={randstr('antiphon')}>The Word was made flesh, and we beheld his glory.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
      } else if (this.inEpiphany()) {
        antiphon = [
          <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
      } else if (this.inLent()) {
        antiphon = [
          <LText key={randstr('antiphon')}>The Lord is near to those who call on him.</LText>,
          <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
        ];
      }
      else {
        antiphon = []
      }

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
        <Section>
      <SectionTitle>Antiphon</SectionTitle>
        {antiphon}
    </Section>
      </View>
    )
      this.prev = "prime";
      this.next = "terce";
  }
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}