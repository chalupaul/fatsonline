import { ProduceCalendar } from '@/components/BiblePlan';
import { ApostlesCreed, CText, GloryBe, Hour, LText, NText, NiceneCreed, Oremus, OurFatherText, Psalmody, Section, SectionTitle, TextSpacer, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View } from '@/components/Themed';
import { psalms2readings } from '@/constants/BibleInfo';

export class Noon extends Hour {
  constructor(date: Date) {
    super(date);
    this.title = "Midday Prayers";
    this.prev = "matins";
    this.next = "vespers";

    const creed = this.date.getDate() % 2 === 0 ? <NiceneCreed /> : <ApostlesCreed />

    const psalmReading = ProduceCalendar(this.DaysInMonth() * 4, psalms2readings)[this.date.getDate() * 4 - 3];

    this.text = (
      <View style={{paddingBottom: 20}}>
        <Section>
          <SectionTitle>Versicle</SectionTitle>
          <LText>Holy God, holy and mighty, holy and immortal,</LText>
          <CText>have mercy and hear us.</CText>
        </Section>
        <Psalmody psalmReading={psalmReading}/>
        <Section>
          <SectionTitle>Vocatio et Responsio</SectionTitle>
          <LText>Show us your mercy, O Lord,</LText>
          <CText>and grant us your salvation.</CText>
          <TextSpacer />
          <LText>Clothe your ministers with righteousness.</LText>
          <CText>Let your people sing with joy.</CText>
          <TextSpacer />
          <LText>Give peace, O Lord, in all the world;</LText>
          <CText>for only in you can we live in safety.</CText>
          <TextSpacer />
          <LText>Lord, keep your church under your care,</LText>
          <CText>and guide us in the way of justice and truth.</CText>
          <TextSpacer />
          <LText>Let your way be known upon earth;</LText>
          <CText>your saving health among all nations.</CText>
          <TextSpacer />
          <LText>Let not the needy, O Lord, be forgotten,</LText>
          <CText>nor the hope of the poor be taken away.</CText>
          <TextSpacer />
          <LText>Create in us clean hearts, O God,</LText>
          <CText>and sustain us with your Holy Spirit. Amen.</CText>
        </Section>
        {creed}
        <Oremus />
        <Section>
          <SectionTitle>Pater Noster</SectionTitle>
          <OurFatherText />
        </Section>
        <Section>
          <SectionTitle>Benediction</SectionTitle>
          <LText>Let us bless the Lord.</LText>
          <CText>Thanks be to God.</CText>
          <TextSpacer />
          <LText>The Lord bless us, defend us from all evil, and bring us to everlasting life.</LText>
          <CText>Amen.</CText>
        </Section>
      </View>
    )
  }
}


export default function Service() {
    const service: Hour = new Noon(new Date());
  return <HourService hour={service} />
}
