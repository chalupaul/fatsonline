import { Chapter, MakeReadingTitles, ProduceCalendar } from '@/components/BiblePlan';
import { CText, Gloria, GloryBe, Hour, Kyrie, LText, Magnificat, NText, Oremus, OurFather, PostLectionary, PostPsalmody, Psalmody, Section, SectionTitle, TextSpacer, VoceMea, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { OTNT, psalms2readings } from '@/constants/BibleInfo';


export class Vespers extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Evening Prayer";
      this.prev = "noon";
      this.next = "compline";

      // -1 for index starting at 0.
      const psalmReading = ProduceCalendar(this.DaysInMonth() * 4, psalms2readings)[this.date.getDate() * 4 - 2];
      //const dailyReading = ProduceCalendar(this.DaysInMonth(), proverbs)[this.date.getDate() - 1]; 
      const dailyReading = ProduceCalendar(this.DaysInYear() * 2, OTNT)[this.DayOfYear() * 2 - 1];
      const dailyReadingTitle = MakeReadingTitles(dailyReading);

      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Invitatory</SectionTitle>
            {this.versicle}
          </Section>
          <Section>
            <LText>Joyous light of glory:</LText>
            <CText>
              Of the immortal father;
              heavenly, holy, blessed Jesus Christ.
              We have come to the setting of the sun,
              and we look to the evening light.
              We sing to God, the Father, Son, and Holy Spirit:
              You are worthy of being praised with pure voices forever.
              O Son of God, O Giver of life:
              The universe proclaims your glory.
            </CText>
          </Section>
          <Section>
            <LText>
              Let us give thanks to the Lord our God.
            </LText>
            <CText>
              It is right to give our thanks and praise.
            </CText>
          </Section>
          <Section>
            <LText>
              Blessed are you, O Lord our God, king of the universe,
              who led your people Israel by a pillar of cloud by day 
              and a pillar of fire by night:
              Enlighten our darkness by the light of your Christ; 
              may your Word be a lamp to our feet and a light to our path;
              for you are merciful, and you love your whole creation,
              and we, your creatures glorify you, Father, Son, and Holy Spirit.
            </LText>
            <CText>Amen.</CText>
          </Section>
          <Section>
            <SectionTitle>Antiphon</SectionTitle>
            <LText>Let my prayer rise before you as incense;</LText>
            <CText>The lifting up of my hands as the evening sacrifice.</CText>
          </Section>
          <Psalmody psalmReading={psalmReading}/>
          <Section>
            <SectionTitle>Antiphon Repeated</SectionTitle>
            <LText>Let my prayer rise before you as incense;</LText>
            <CText>The lifting up of my hands as the evening sacrifice.</CText>
          </Section>
          <Section>
            <NText><Text style={{fontStyle: "italic"}}>Silence for Meditation.</Text></NText>
            <TextSpacer />
            <LText>
              Let the incense of our repentant prayer ascend before you,
              O Lord, and let your loving-kindness descend upon us,
              that with purified minds we may sing your praises
              with the Church on earth and the whole heavenly host,
              and may glorify you forever and ever.
            </LText>
            <CText>Amen.</CText>
          </Section>
          <GloryBe inLent={this.inLent()} />
          <Section>
            <SectionTitle>Lectio</SectionTitle>
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
          <PostLectionary />
          <Section>
            <SectionTitle>Magnificat Antiphon</SectionTitle>
            {this.canticleAntiphon}
          </Section>
          <Magnificat />
          <Section>
            <SectionTitle>Magnificat Antiphon Repeated</SectionTitle>
            {this.canticleAntiphon}
          </Section>
          <Oremus>Review the events of the day and thank God for His generosity and lavish gifts.</Oremus>
          <Section>
            <LText>
              Rejoicing in the fellowship of all the saints, 
              let us commend ourselves, one another, 
              and our whole life to Christ, our Lord.
            </LText>
            <CText>To you, O Lord.</CText>
            <TextSpacer />
            <LText>
              O God, from whom come all holy desires, all good counsels, 
              and all just works: Give to us, your servants, 
              that peace which the world cannot give, 
              that our hearts may be set to obey your commandments; 
              and also that we, being defended from the fear of our enemies, 
              may live in peace and quietness; 
              through Jesus Christ our Savior, 
              who lives and reigns with you and the Holy Spirit, God forever.
            </LText>
            <CText>Amen.</CText>
          </Section>
          <OurFather />
          <Section>
            <SectionTitle>Benediction</SectionTitle>
            <LText>Let us bless the Lord.</LText>
            <CText>Thanks be to God.</CText>
            <TextSpacer />
            <LText>The almighty and merciful Lord, the Father, the Son, and the Holy Spirit, bless and preserve us.</LText>
            <CText>Amen.</CText>
          </Section>
        </View>
      )
  }
}

export default function Service() {
    const service: Hour = new Vespers(new Date());
  return <HourService hour={service} />
}
