import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type InviteUserEmailProps = {
  username: string;
  invitedByUsername: string;
  invitedByEmail: string;
  organizationName: string;
  inviteLink: string;
  inviteFromIp: string;
  inviteFromLocation: string;
};

export const InviteUserEmailEN = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Join <strong>{organizationName}</strong> on{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{organizationName}</strong> team
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{' '}
              {inviteFromLocation && (
                <>
                  {' located in '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailFR = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Rejoignez ${invitedByUsername} sur Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Rejoignez <strong>{organizationName}</strong> sur{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) vous a invité à rejoindre l'équipe de{' '}
              <strong>{organizationName}</strong> sur <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Rejoindre l'équipe
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copiez et collez cette URL dans votre navigateur :{' '}
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Cette invitation était destinée à{' '}
              <span className="text-black">{username}</span>. Cette invitation a
              été envoyée depuis{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', située à '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Si vous n'attendiez pas cette invitation, vous pouvez ignorer
              cet email. Si vous êtes préoccupé par la sécurité de votre compte,
              veuillez répondre à cet email pour nous contacter.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailES = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Únete a ${invitedByUsername} en Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Únete a <strong>{organizationName}</strong> en{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) te ha invitado a unirte al equipo de{' '}
              <strong>{organizationName}</strong> en <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Unirse al equipo
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia y pega esta URL en tu navegador:{' '}
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Esta invitación estaba destinada para{' '}
              <span className="text-black">{username}</span>. Esta invitación
              fue enviada desde{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', ubicada en '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Si no esperabas esta invitación, puedes ignorar este correo. Si
              estás preocupado por la seguridad de tu cuenta, por favor responde
              a este correo para contactarte con nosotros.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailRU = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Присоединяйтесь к ${invitedByUsername} в Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Присоединяйтесь к <strong>{organizationName}</strong> в{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Здравствуйте, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) пригласил вас в команду <strong>{organizationName}</strong> в{' '}
              <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Присоединиться к команде
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              или скопируйте и вставьте этот URL в ваш браузер:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Это приглашение предназначалось для{' '}
              <span className="text-black">{username}</span>. Это приглашение
              было отправлено с IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', находящегося в '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Если вы не ожидали этого приглашения, вы можете проигнорировать
              это письмо. Если вы обеспокоены безопасностью своего аккаунта,
              пожалуйста, ответьте на это письмо, чтобы связаться с нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailJA = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Intlayerで${invitedByUsername}に参加しましょう`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              <strong>Intlayer</strong>の<strong>{organizationName}</strong>
              に参加しましょう
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}様、こんにちは。
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) さんが、あなたを<strong>Intlayer</strong>の
              <strong>{organizationName}</strong>チームに招待しました。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                チームに参加する
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              または、以下のURLをブラウザにコピー＆ペーストしてください：
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              この招待状は<span className="text-black">{username}</span>
              様宛に送られました。この招待状は IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  （場所：
                  <span className="text-black">{inviteFromLocation}</span>）
                </>
              )}
              から送信されました。もしこの招待に心当たりがない場合は、このメールを無視してください。アカウントの安全性が気になる場合は、このメールに返信してご連絡ください。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailKO = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Intlayer에서 ${invitedByUsername}님과 함께하세요`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              <strong>Intlayer</strong>에서 <strong>{organizationName}</strong>{' '}
              팀에 참여하세요
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              안녕하세요 {username}님,
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              )님이 당신을 <strong>Intlayer</strong>의{' '}
              <strong>{organizationName}</strong> 팀으로 초대했습니다.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                팀 참여하기
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              또는 다음 URL을 브라우저에 복사하여 붙여넣으세요:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              이 초대는 <span className="text-black">{username}</span>님을 위해
              발송되었습니다. 이 초대는 IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  (위치:{' '}
                  <span className="text-black">{inviteFromLocation}</span>)
                </>
              )}
              에서 전송되었습니다. 만약 이 초대를 기다리지 않으셨다면 이
              이메일을 무시하셔도 됩니다. 계정 보안이 걱정되신다면 이 이메일에
              답장을 보내 저희에게 문의해 주세요.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailZH = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `在 Intlayer 上加入 ${invitedByUsername}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              在 <strong>Intlayer</strong> 上加入{' '}
              <strong>{organizationName}</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              {username}，您好！
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) 邀请您加入 <strong>Intlayer</strong> 上的{' '}
              <strong>{organizationName}</strong> 团队。
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                加入团队
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              或者将此 URL 复制并粘贴到您的浏览器中：
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              此邀请旨在发送给 <span className="text-black">{username}</span>
              。此邀请发送自 IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  （位于{' '}
                  <span className="text-black">{inviteFromLocation}</span>）
                </>
              )}
              。如果您没有预料到此邀请，可以忽略此邮件。如果您担心账户安全，请回复此邮件与我们联系。
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailDE = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Treten Sie ${invitedByUsername} auf Intlayer bei`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Treten Sie <strong>{organizationName}</strong> auf{' '}
              <strong>Intlayer</strong> bei
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hallo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) hat Sie eingeladen, dem Team <strong>{organizationName}</strong>{' '}
              auf <strong>Intlayer</strong> beizutreten.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Dem Team beitreten
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              oder kopieren Sie diese URL in Ihren Browser:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Diese Einladung war für{' '}
              <span className="text-black">{username}</span> gedacht. Diese
              Einladung wurde von der IP-Adresse{' '}
              <span className="text-black">{inviteFromIp}</span> gesendet
              {inviteFromLocation && (
                <>
                  {' aus '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Wenn Sie diese Einladung nicht erwartet haben, können Sie diese
              E-Mail ignorieren. Wenn Sie Bedenken hinsichtlich der Sicherheit
              Ihres Kontos haben, antworten Sie bitte auf diese E-Mail, um mit
              uns in Kontakt zu treten.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailAR = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `انضم إلى ${invitedByUsername} على Intlayer`;

  return (
    <Html dir="rtl">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              انضم إلى <strong>{organizationName}</strong> على{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              أهلاً {username}،
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              قام <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) بدعوتك للانضمام إلى فريق <strong>{organizationName}</strong> على{' '}
              <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                الانضمام إلى الفريق
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              أو قم بنسخ ولصق هذا الرابط في متصفحك:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              كانت هذه الدعوة مخصصة لـ{' '}
              <span className="text-black">{username}</span>. تم إرسال هذه
              الدعوة من عنوان IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' الموجود في '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . إذا لم تكن تتوقع هذه الدعوة، يمكنك تجاهل هذا البريد الإلكتروني.
              إذا كنت قلقاً بشأن أمان حسابك، فيرجى الرد على هذا البريد الإلكتروني
              للتواصل معنا.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailIT = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Unisciti a ${invitedByUsername} su Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Unisciti a <strong>{organizationName}</strong> su{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Ciao {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) ti ha invitato a unirti al team{' '}
              <strong>{organizationName}</strong> su <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Unisciti al team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              o copia e incolla questo URL nel tuo browser:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Questo invito era destinato a{' '}
              <span className="text-black">{username}</span>. Questo invito è
              stato inviato dall'IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' situato a '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Se non ti aspettavi questo invito, puoi ignorare questa e-mail.
              Se sei preoccupato per la sicurezza del tuo account, rispondi a
              questa e-mail per metterti in contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailEN_GB = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Join <strong>{organizationName}</strong> on{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{organizationName}</strong> team
              on <strong>Intlayer</strong>.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{' '}
              {inviteFromLocation && (
                <>
                  {' located in '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account's safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailPT = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Junte-se a ${invitedByUsername} no Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Junte-se a <strong>{organizationName}</strong> no{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Olá {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) convidou você para a equipe <strong>{organizationName}</strong>{' '}
              no <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Juntar-se à equipe
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              ou copie e cole esta URL no seu navegador:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Este convite foi destinado a{' '}
              <span className="text-black">{username}</span>. Este convite foi
              enviado do IP <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' localizado em '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Se você não esperava este convite, pode ignorar este e-mail. Se
              estiver preocupado com a segurança da sua conta, responda a este
              e-mail para entrar em contato conosco.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailHI = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Intlayer पर ${invitedByUsername} के साथ जुड़ें`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              <strong>Intlayer</strong> पर <strong>{organizationName}</strong> में
              शामिल हों
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              नमस्ते {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) ने आपको <strong>Intlayer</strong> पर{' '}
              <strong>{organizationName}</strong> टीम में शामिल होने के लिए आमंत्रित
              किया है।
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                टीम में शामिल हों
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              या इस URL को कॉपी करके अपने ब्राउज़र में पेस्ट करें:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              यह आमंत्रण <span className="text-black">{username}</span> के लिए था।
              यह आमंत्रण IP <span className="text-black">{inviteFromIp}</span>{' '}
              {inviteFromLocation && (
                <>
                  {' से भेजा गया था जो '}
                  <span className="text-black">{inviteFromLocation}</span>
                  {' में स्थित है। '}
                </>
              )}
              यदि आप इस आमंत्रण की अपेक्षा नहीं कर रहे थे, तो आप इस ईमेल को नज़रअंदाज़ कर
              सकते हैं। यदि आप अपने खाते की सुरक्षा को लेकर चिंतित हैं, तो कृपया हमसे संपर्क
              करने के लिए इस ईमेल का उत्तर दें।
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailTR = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Intlayer'da ${invitedByUsername}'a katılın`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              <strong>Intlayer</strong>'da <strong>{organizationName}</strong>{' '}
              ekibine katılın
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Merhaba {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ), sizi <strong>Intlayer</strong>'daki{' '}
              <strong>{organizationName}</strong> ekibine davet etti.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Ekibe katıl
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              veya bu URL'yi kopyalayıp tarayıcınıza yapıştırın:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Bu davet <span className="text-black">{username}</span> için
              gönderilmiştir. Bu davet{' '}
              <span className="text-black">{inviteFromIp}</span> IP adresinden{' '}
              {inviteFromLocation && (
                <>
                  (<span className="text-black">{inviteFromLocation}</span>)
                </>
              )}
              gönderilmiştir. Eğer bu daveti beklemiyorsanız, bu e-postayı
              dikkate almayabilirsiniz. Hesabınızın güvenliği konusunda
              endişeleriniz varsa, bizimle iletişime geçmek için lütfen bu
              e-postayı yanıtlayın.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailPL = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Dołącz do ${invitedByUsername} w Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Dołącz do <strong>{organizationName}</strong> w{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Witaj {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) zaprosił Cię do zespołu <strong>{organizationName}</strong> w{' '}
              <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Dołącz do zespołu
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              lub skopiuj i wklej ten adres URL do przeglądarki:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              To zaproszenie było przeznaczone dla{' '}
              <span className="text-black">{username}</span>. Zaproszenie
              zostało wysłane z adresu IP{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' z lokalizacji '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Jeśli nie spodziewałeś się tego zaproszenia, możesz zignorować
              tę wiadomość. Jeśli martwisz się o bezpieczeństwo swojego konta,
              odpowiedz na ten e-mail, aby się z nami skontaktować.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailID = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Bergabunglah dengan ${invitedByUsername} di Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Bergabunglah dengan <strong>{organizationName}</strong> di{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Halo {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) telah mengundang Anda untuk bergabung dengan tim{' '}
              <strong>{organizationName}</strong> di <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Bergabung dengan tim
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              atau salin dan tempel URL ini ke browser Anda:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Undangan ini ditujukan untuk{' '}
              <span className="text-black">{username}</span>. Undangan ini
              dikirim dari IP <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' yang berlokasi di '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Jika Anda tidak mengharapkan undangan ini, Anda dapat
              mengabaikan email ini. Jika Anda khawatir tentang keamanan akun
              Anda, silakan balas email ini untuk menghubungi kami.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailVI = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Tham gia cùng ${invitedByUsername} trên Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Tham gia cùng <strong>{organizationName}</strong> trên{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Xin chào {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) đã mời bạn tham gia đội ngũ <strong>{organizationName}</strong>{' '}
              trên <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Tham gia đội ngũ
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              hoặc sao chép và dán URL này vào trình duyệt của bạn:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Lời mời này dành cho{' '}
              <span className="text-black">{username}</span>. Lời mời này đã
              được gửi từ IP <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {' tại '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Nếu bạn không mong đợi lời mời này, bạn có thể bỏ qua email này.
              Nếu bạn lo lắng về tính bảo mật của tài khoản, vui lòng phản hồi
              email này để liên hệ với chúng tôi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const InviteUserEmailUK = ({
  username,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  inviteFromIp,
  inviteFromLocation,
}: InviteUserEmailProps) => {
  const previewText = `Приєднуйтесь до ${invitedByUsername} в Intlayer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Приєднуйтесь до <strong>{organizationName}</strong> в{' '}
              <strong>Intlayer</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Вітаємо, {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-[#8a8a8a] no-underline"
              >
                {invitedByEmail}
              </Link>
              ) запросив вас до команди <strong>{organizationName}</strong> в{' '}
              <strong>Intlayer</strong>.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Приєднатися до команди
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              або скопіюйте та вставте цю URL-адресу у ваш браузер:
            </Text>
            <Link
              href={inviteLink}
              className="text-[#8a8a8a] text-[10px] no-underline"
            >
              {inviteLink}
            </Link>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Це запрошення було призначене для{' '}
              <span className="text-black">{username}</span>. Це запрошення було
              відправлено з IP-адреси{' '}
              <span className="text-black">{inviteFromIp}</span>
              {inviteFromLocation && (
                <>
                  {', що знаходиться в '}
                  <span className="text-black">{inviteFromLocation}</span>
                </>
              )}
              . Якщо ви не очікували цього запрошення, ви можете проігнорувати
              цей лист. Якщо ви стурбовані безпекою свого облікового запису,
              будь ласка, дайте відповідь на цей лист, щоб зв'язатися з нами.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: InviteUserEmailProps = {
  username: 'alanturing',
  invitedByUsername: 'Alan',
  invitedByEmail: 'alan.turing@example.com',
  organizationName: 'Enigma',
  inviteLink: 'https://intlayer.org/teams/invite/foo',
  inviteFromIp: '204.13.x.x',
  inviteFromLocation: 'São Paulo, Brazil',
};

InviteUserEmailEN.PreviewProps = PreviewProps;
InviteUserEmailFR.PreviewProps = PreviewProps;
InviteUserEmailES.PreviewProps = PreviewProps;
InviteUserEmailRU.PreviewProps = PreviewProps;
InviteUserEmailJA.PreviewProps = PreviewProps;
InviteUserEmailKO.PreviewProps = PreviewProps;
InviteUserEmailZH.PreviewProps = PreviewProps;
InviteUserEmailDE.PreviewProps = PreviewProps;
InviteUserEmailAR.PreviewProps = PreviewProps;
InviteUserEmailIT.PreviewProps = PreviewProps;
InviteUserEmailEN_GB.PreviewProps = PreviewProps;
InviteUserEmailPT.PreviewProps = PreviewProps;
InviteUserEmailHI.PreviewProps = PreviewProps;
InviteUserEmailTR.PreviewProps = PreviewProps;
InviteUserEmailPL.PreviewProps = PreviewProps;
InviteUserEmailID.PreviewProps = PreviewProps;
InviteUserEmailVI.PreviewProps = PreviewProps;
InviteUserEmailUK.PreviewProps = PreviewProps;
