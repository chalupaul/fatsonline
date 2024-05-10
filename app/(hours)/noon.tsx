import { CText, Hour, LText, NText, OurFatherText, Section, SectionTitle, TextSpacer } from '@/components/Service';
import HourService from '@/components/Service';
import { View, Text } from '@/components/Themed';

export class Noon extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Noontime Prayers";
      this.prev = "matins";
      this.next = "vespers";
      this.text = (
        <View style={{paddingBottom: 20}}>
          <Section>
            <SectionTitle>Versicle</SectionTitle>
            <LText>Holy God, holy and mighty, holy and immortal,</LText>
            <CText>have mercy and hear us.</CText>
          </Section>
          <Section>
            <SectionTitle>Pater Noster</SectionTitle>
            <OurFatherText />
          </Section>
          <Section>
            <SectionTitle>Apostles Creed</SectionTitle>
            <CText>
              I believe in God, the father almighty, creator of heaven and earth.
            </CText>
            <TextSpacer />
            <NText>
              I believe in Jesus Christ, his only Son, our Lord,
              who was conceived by the Holy Spirit,
              born of the Virgin Mary,
              suffered under Pontius Pilate,
              was crucified, died, and was buried.
              He descended to the dead.
              On the third day he rose again.
              He ascended into heaven.
              He is seated at the right hand of the Father,
              and he will come to judge the living and the dead.
            </NText>
            <TextSpacer />
            <NText>
              I believe in the Holy Spirit,
              the holy catholic church,
              the communion of saints,
              the forgiveness of sins,
              the resurrection of the body,
              and the life everlasting.
            </NText>
            <TextSpacer />
            <NText>Amen.</NText>
          </Section>
          <Section>
            <SectionTitle>Call and Response Prayer</SectionTitle>
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
          <Section>
            <LText>Let us pray...</LText>
            <LText><Text style={{fontStyle: "italic"}}>The Prayer of the Day is Said.</Text></LText>
            <CText>Amen.</CText>
            <TextSpacer />
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
