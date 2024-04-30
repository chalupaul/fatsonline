import { AText, CText, GloryBe, Hour, LText, Section, SectionTitle } from '@/components/Service';
import HourService from '@/components/Service';


export class Prime extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Early Morning Prayer";
      this.text = (
          <Section>
            <SectionTitle>Versicle</SectionTitle>
            <LText>Oh Lord, open my lips,</LText>
            <CText>and my mouth shall declare your praise.</CText>
            <GloryBe />
            {!this.inLent() && <AText>Alleluia! Alleluia!</AText>}
        </Section>
      )
      this.next = "matins";
  }
}

export default function Service() {
    const service: Hour = new Prime(new Date());
  return <HourService hour={service} />
}
