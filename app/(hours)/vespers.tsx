import { Chapter, MakeReadingTitles, ProduceCalendar } from '@/components/BiblePlan';
import { CText, Gloria, GloryBe, Hour, Kyrie, LText, Magnificat, NText, Oremus, OurFather, Section, SectionTitle, TextSpacer, VoceMea, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { proverbs, psalms2readings } from '@/constants/BibleInfo';


export class Vespers extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Evening Prayer";
      this.prev = "noon";
      this.next = "compline";

      // -1 for index starting at 0, -1 for the morning reading.
      const psalmReading = ProduceCalendar(this.DaysInMonth() * 2, psalms2readings)[this.date.getDate() * 2 - 1];
      const psalmReadingTitle = MakeReadingTitles(psalmReading);
      const dailyReading = ProduceCalendar(this.DaysInMonth(), proverbs)[this.date.getDate() - 1]; 
      const dailyReadingTitle = MakeReadingTitles(dailyReading);

      let versicle: React.JSX.Element[];
      if (this.inAdvent()) {
        versicle = [
          <LText key={randstr('vesperVersicle')}>The Spirit and the Church cry out:</LText>,
          <CText key={randstr('vesperVersicle')}>Come, Lord Jesus.</CText>,
          <LText key={randstr('vesperVersicle')}>All those who await his appearance pray:</LText>,
          <CText>Come, Lord Jesus.</CText>,
          <LText>The whole creation pleads:</LText>,
          <CText>Come, Lord Jesus.</CText>
        ]
      } else if (this.in12Days() || this.isEpiphany()) {
        versicle = [
          <LText key={randstr('vesperVersicle')}>The people who walked in darkness have seen a great light.</LText>,
          <CText key={randstr('vesperVersicle')}>The light shines in the darkness, and the darkness has not overcome it.</CText>,
          <LText key={randstr('vesperVersicle')}>Those who dwelt in the land of deep darkness, on them has light shined.</LText>,
          <CText key={randstr('vesperVersicle')}>We have beheld Christ's glory, glory as of the only Son from the Father.</CText>,
          <LText key={randstr('vesperVersicle')}>For to us a child is born, to us a Son is given.</LText>,
          <CText key={randstr('vesperVersicle')}>In him was life, and the life was the light of man.</CText>
        ]
      } else if (this.inEpiphany()) {
        versicle = [
          <LText key={randstr('vesperVersicle')}>Jesus Christ is the Light of the world,</LText>,
          <CText key={randstr('vesperVersicle')}>the light no darkness can overcome.</CText>,
          <LText key={randstr('vesperVersicle')}>Stay with us, Lord, for it is evening,</LText>,
          <CText key={randstr('vesperVersicle')}>and the day is almost over.</CText>,
          <LText key={randstr('vesperVersicle')}>Let your light scatter the darkness,</LText>,
          <CText key={randstr('vesperVersicle')}>and illumine your Church.</CText>
        ]
      } else if (this.inLent()) {
        versicle = [
          <LText key={randstr('vesperVersicle')}>Behold, now is the acceptable time;</LText>,
          <CText key={randstr('vesperVersicle')}>now is the day of salvation.</CText>,
          <LText key={randstr('vesperVersicle')}>Turn us again, O God of our salvation,</LText>,
          <CText key={randstr('vesperVersicle')}>that the light of your face may shine on us.</CText>,
          <LText key={randstr('vesperVersicle')}>May your justice shine like the sun;</LText>,
          <CText key={randstr('vesperVersicle')}>and may the poor be lifted up.</CText>
        ]
      } else if (this.inEasterTide()) {
        versicle = [
          <LText key={randstr('vesperVersicle')}>Jesus Christ is risen from the dead.</LText>,
          <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>,
          <LText key={randstr('vesperVersicle')}>We are illumined by the brightness of his rising.</LText>,
          <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>,
          <LText key={randstr('vesperVersicle')}>Death has no more dominion over us.</LText>,
          <CText key={randstr('vesperVersicle')}>Alleluia, alleluia, alleluia!</CText>
        ]
      } else {
        versicle = [
          <LText key={randstr('vesperVersicle')}>Come, let us worship and bow down before God our King.</LText>,
          <CText key={randstr('vesperVersicle')}>Let us kneel before the Lord our God our maker.</CText>,
          <LText key={randstr('vesperVersicle')}>Come, let us worship and bow down before Christ our God and our King</LText>,
          <CText key={randstr('vesperVersicle')}>Holy, holy, holy is the Lord of hosts.</CText>,
          <LText key={randstr('vesperVersicle')}>Come, let us worship Christ, our King and our God, and bow down before Him.</LText>,
          <CText key={randstr('vesperVersicle')}>The whole earth is full of his glory.</CText>
        ]
      }

      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Versicle</SectionTitle>
            {versicle}
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
            <SectionTitle>Dominus vobiscum</SectionTitle>
            <LText>The Lord be with you.</LText>
            <CText>And also with you.</CText>
            <LText>Let us give thanks to the Lord our God.</LText>
            <CText>It is right to give him thanks and praise.</CText>
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
          <VoceMea />
          <GloryBe />
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
          <Section>
            <SectionTitle>Psalmody</SectionTitle>
            <Text>{psalmReadingTitle.includes('-') ? psalmReadingTitle : psalmReadingTitle.replace('Psalms', 'Psalm')}</Text>
            {
              psalmReading.map((v: Chapter,i) => {
                let final = i != psalmReading.length - 1 ? <TextSpacer /> : <View />;
                return (
                  <View key={randstr('psalm')}>
                    <Section>
                      <NText>{v.bookName.slice(0,-1)} {v.chapter}</NText>
                    </Section>
                    <NText>{v.text}</NText>
                    {final}
                  </View>
                )
              })
            }
          </Section>
          <Kyrie />
          <Gloria />
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
          <Section>
            <LText>In many and various ways God spoke to his people of old by the prophets.</LText>
            <CText>But now in these last days he has spoken to us by his Son.</CText>
          </Section>
          <Section>
            <SectionTitle>Magnificat Antiphon</SectionTitle>
            {this.canticleAntiphon}
          </Section>
          <Magnificat />
          <GloryBe />
          <Section>
            <SectionTitle>Magnificat Antiphon Repeated</SectionTitle>
            {this.canticleAntiphon}
          </Section>
          <Oremus />
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
