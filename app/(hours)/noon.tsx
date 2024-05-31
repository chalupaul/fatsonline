import { Chapter, MakeReadingTitles, ProduceCalendar } from '@/components/BiblePlan';
import { ApostlesCreed, CText, Gloria, Hour, Kyrie, LText, NText, NiceneCreed, Oremus, OurFatherText, Section, SectionTitle, TextSpacer, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { job } from '@/constants/BibleInfo';

export class Noon extends Hour {
  constructor(date: Date) {
    super(date);
    this.title = "Midday Prayers";
    this.prev = "matins";
    this.next = "vespers";

    const dailyReading = ProduceCalendar(this.DaysInMonth(), job)[this.date.getUTCDate() - 1]; 
    const dailyReadingTitle = MakeReadingTitles(dailyReading);

    const creed = this.date.getDate() % 2 === 0 ? <NiceneCreed /> : <ApostlesCreed />

    this.text = (
      <View style={{paddingBottom: 20}}>
        <Section>
          <SectionTitle>Versicle</SectionTitle>
          <LText>Holy God, holy and mighty, holy and immortal,</LText>
          <CText>have mercy and hear us.</CText>
        </Section>
        {creed}
        <Section>
          <SectionTitle>Pater Noster</SectionTitle>
          <OurFatherText />
        </Section>
        <Kyrie />
        <Gloria />
        <Section>
          <SectionTitle>Lectio </SectionTitle>
          <Text>{dailyReadingTitle}</Text>
            {
              dailyReading.map((v: Chapter, i) => {
                return (
                  <View key={randstr('lectio')}>
                    <Section>
                      <NText>{v.text}</NText>
                    </Section>
                  </View>
                )
              })
            }
        </Section>
        <Section>
          <LText>In many and various ways God spoke to his people of old by the prophets.</LText>
          <CText>But now in these last days he has spoken to us by his Son.</CText>
        </Section>
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
          <CText>and sustain us with your Holy Spirit.</CText>
        </Section>
        <Section>
          <SectionTitle>Dominus vobiscum</SectionTitle>
          <LText>The Lord be with you.</LText>
          <CText>And also with you.</CText>
        </Section>
        <Oremus />
        <Section>
          <LText>
            Gracious Jesus, our Lord and our God, 
            at this hour you bore our sins in your own body on the tree so that we,
            being dead to sin, might live unto righteousness.
            Have mercy upon us now and at the hour of our death,
            and grant to us, your servants, with all others who devoutedly remember your blessed Passion,
            a holy and peaceful life in this world and, through your grace, eternal glory in the life to come;
            where, with the Father and the Holy Spirit, you live and reign, God forever.
          </LText>
          <CText>Amen.</CText>
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
