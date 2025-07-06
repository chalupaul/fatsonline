import { ProduceCalendar, MakeReadingTitles, Chapter } from '@/components/BiblePlan';
import { Benedictus, CText, Confiteor, Gloria, GloryBe, Hour, Kyrie, LText, NText, Oremus, OurFather, PostLectionary, Psalmody, Section, SectionTitle, TextSpacer, Venite, randstr } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';
import { psalms2readings, OTNT } from '@/constants/BibleInfo';


export class Matins extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Morning Prayer";
      this.next = "noon";

      // -1 for index starting at 0, -1 for the morning reading.
      const psalmReading = ProduceCalendar(this.DaysInMonth() * 4, psalms2readings)[this.date.getDate() * 4 - 4];
      //const dailyReading = ProduceCalendar(this.DaysInYear(), OTNT)[this.DayOfYear() - 1]; 
      const dailyReading = ProduceCalendar(this.DaysInYear() * 2, OTNT)[this.DayOfYear() * 2 - 2];
      const dailyReadingTitle = MakeReadingTitles(dailyReading);

      const prayer = this.date.getDay() != 0 ? <NormalPrayer /> : <SundayPrayer />

      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Invitatory</SectionTitle>
            <LText>Oh Lord, open my lips,</LText>
            <CText>and my mouth shall declare your praise.</CText>
            <TextSpacer />
            <LText>Make haste, O God, to deliver me!</LText>
            <CText>O Lord, make haste to help me!</CText>
          </Section>
          <Confiteor day={this.dayOfWeek}/>
          <Section>
            <SectionTitle>Laudimus</SectionTitle>
            <NText><Text style={{fontStyle: "italic"}}>Incense may be burned.</Text></NText>
            <TextSpacer />
            <LText>
            Awake, O sleeper, and arise from the dead, and Christ will shine on you. (Eph. 5:14b)
            </LText>
            <CText>
              The night is passed and the day is at hand.  
              Let us, therefore cast off the works of darkness and put on the armour of light.  
              Let us walk honestly, as in the day.
            </CText>
          </Section>
          <Section>
            <SectionTitle>Introit</SectionTitle>
            {this.antiphon}
            <Psalmody psalmReading={psalmReading}/>
            {this.antiphon}
          </Section>
          <GloryBe inLent={this.inLent()} />
          <Section>
            <SectionTitle>Lectio</SectionTitle>
            <NText>
              <Text style={{fontStyle: "italic"}}>{dailyReadingTitle}</Text>
            </NText>
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
            <SectionTitle>Benedictus</SectionTitle>
            {this.canticleAntiphon}
          <Benedictus />
            {this.canticleAntiphon}
          </Section>
          {prayer}
          <Section>
            <SectionTitle>Benediction</SectionTitle>
            <LText>Let us bless the Lord.</LText>
            <CText>Thanks be to God.</CText>
            <TextSpacer />
            <LText>The Lord almighty bless us, and direct our days and our deeds in his peace.</LText>
            <CText>Amen.</CText>
          </Section>
        </View>
    )
  }
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}

function NormalPrayer() {
  return (
    <>
    <Oremus>Pray for yourself, your family, church, neighbors, nation, and missions.</Oremus>
    <Section>
      <LText>
        O Lord, almighty and everlasting God, you have brought us in safety to this new day; 
        Preserve us with your mighty power, that we may not fall into sin, nor be overcome 
        in adversity, and in all we do, direct us to the fulfilling of your purpose; 
        through Jesus Christ our Lord.
      </LText>
      <CText>Amen.</CText>
    </Section>
    <OurFather />
    </>
  )
}

function SundayPrayer() {
  return (
    <>
      <Oremus>Pray for yourself, your family, church, neighbors, nation, and missions.</Oremus>
      <Section>
        <LText>As many as have been baptized into Christ have put on Christ.</LText>
        <CText>Amen.</CText>
      </Section>
      <Section>
        <SectionTitle>Paschal Blessing</SectionTitle>
        <LText>
        But on the first day of the week, at early dawn, they went to the tomb, taking the spices they had prepared. 
        And they found the stone rolled away from the tomb, 
        but when they went in they did not find the body of the Lord Jesus. 
        While they were perplexed about this, behold, two men stood by them in dazzling apparel. 
        And as they were frightened and bowed their faces to the ground, the men said to them, “Why do you seek the living among the dead? 
        He is not here, but has risen. Remember how he told you, while he was still in Galilee, 
        that the Son of Man must be delivered into the hands of sinful men and be crucified and on the third day rise.”
        </LText>
      </Section>
      <Section>
        <SectionTitle>Te Deum</SectionTitle>
        <CText>
          You are God; we praise you. You are the Lord; we acclaim you.
          You are the eternal Father; all creation worships you.
          To you all angels, all the powers of heaven, cherubim and seraphim, sing in endless praise:
          Holy, holy, holy Lord, God of power and might, heaven and earth are full of your glory.
          The glorious company of apostles praise you.
          The noble fellowship of prophets praise you.
          The white-robed army of martyrs praise you.
          Throughout the world the holy Church acclaims you:
          Father, of majesty unbounded;
          your true and only Son, worthy of all worship;
          and the Holy Spirit, advocate and guide.
          You, Christ, are the king of glory, the eternal Son of the Father.
          When you became man to set us free,
          you did not spurn the virgin's womb.
          You overcame the sting of death,
          and opened the kingdom of heaven to all believers.
          You are seated at God's right hand in glory.
          We believe that you will come and be our judge.
          Come, then, Lord, and help your people,
          bought with the price of your own blood,
          and bring us with your saints to glory everlasting.
        </CText>
        <LText>
          O God, for our redemption you gave your only Son to suffer death on the cross, 
          and by his glorious resurrection you delivered us from the power of death. 
          Make us die every day to sin so that we may rise to live with Christ forever; 
          who lives and reigns with you and the Holy Spirit, one God, now and forever.
        </LText>
        <CText>Amen.</CText>
      </Section>
    </>
  )
}