import { ui, useLocale } from '../i18n'
import { profile } from '../data/profile'

function BioEnglish() {
  return (
    <>
      <p>
        I am a mechatronics engineer working on robotics, embodied AI, and computer vision. I
        recently completed my Master of Mechatronics Engineering (Research) at the{' '}
        <a href="https://www.auckland.ac.nz/" target="_blank" rel="noreferrer">
          University of Auckland
        </a>
        , where I studied emotion-aware human-robot collaboration on a UR5e — how a robot should
        adapt its speed and distance to the human working next to it.
      </p>
      <p>
        During my master&rsquo;s, I interned at{' '}
        <a href="https://at.govt.nz/" target="_blank" rel="noreferrer">
          Auckland Transport
        </a>{' '}
        validating YOLOv8 pipelines for intelligent transport systems, and at Cloudcell building a
        similarity-search platform over millions of ChEMBL compounds.
      </p>
      <p>
        Before moving to New Zealand, I spent five years as a field service engineer at{' '}
        <a href="https://www.axcelis.com/" target="_blank" rel="noreferrer">
          Axcelis Technologies
        </a>{' '}
        and{' '}
        <a href="https://www.nikon.com/business/precision/" target="_blank" rel="noreferrer">
          Nikon Precision
        </a>
        , diagnosing semiconductor and FPD lithography equipment — log analysis, waveform and
        Fourier diagnostics, and filter calibration on machines that are not allowed to fail.
      </p>
      <p>
        <strong>Goal:</strong> robots and AI systems that keep working outside the demo.
      </p>
      <p>
        <strong>Interests:</strong> robotics, embodied AI, human-robot interaction, computer
        vision, and practical ML systems.
      </p>
      <p>
        <strong>Currently:</strong> looking for AI/ML, robotics, computer vision, and software
        engineering roles.
      </p>
    </>
  )
}

function BioChinese() {
  return (
    <>
      <p>
        我叫何昌劲,是一名机电工程师,主要关注机器人、具身智能与计算机视觉。我在
        <a href="https://www.auckland.ac.nz/" target="_blank" rel="noreferrer">
          奥克兰大学
        </a>
        完成了机电工程研究型硕士,研究方向是情绪感知的人机协作:机械臂与人一起工作时,
        应当如何调整自己的速度与距离。
      </p>
      <p>
        读研期间,我有幸在{' '}
        <a href="https://at.govt.nz/" target="_blank" rel="noreferrer">
          Auckland Transport
        </a>{' '}
        实习,参与智能交通场景下 YOLOv8 视觉管线的验证;也在 Cloudcell
        参与搭建了一个覆盖数百万 ChEMBL 化合物的药物相似性检索平台。
      </p>
      <p>
        来新西兰之前,我在{' '}
        <a href="https://www.axcelis.com/" target="_blank" rel="noreferrer">
          Axcelis
        </a>{' '}
        和
        <a href="https://www.nikon.com/business/precision/" target="_blank" rel="noreferrer">
          尼康精机
        </a>
        做了五年现场服务工程师,与半导体和面板光刻设备打交道:日志分析、波形与傅里叶诊断、
        滤波器标定。这段经历让我明白,真实环境里的系统远比实验室里的复杂。
      </p>
      <p>
        <strong>目标:</strong>希望做出走出演示环境之后,依然能稳定工作的机器人与 AI 系统。
      </p>
      <p>
        <strong>兴趣:</strong>机器人、具身智能、人机交互、计算机视觉,以及务实的机器学习系统。
      </p>
      <p>
        <strong>现状:</strong>正在寻找 AI/机器学习、机器人、计算机视觉与软件工程方向的机会,
        欢迎交流。
      </p>
    </>
  )
}

export function Header() {
  const locale = useLocale()

  return (
    <header className="masthead">
      <h1>
        {locale === 'zh' ? (
          <>
            {profile.chineseName} <span className="cn-name">「{profile.name}」</span>
          </>
        ) : (
          <>
            {profile.name} <span className="cn-name">「{profile.chineseName}」</span>
          </>
        )}
      </h1>

      <div className="header-grid">
        <div className="header-media">
          <img
            src={profile.avatarSrc}
            alt={profile.avatarAlt}
            width={560}
            height={746}
            fetchPriority="high"
          />
          <p className="profile-links">
            {profile.links.map((link, index) => (
              <span key={link.label.en}>
                {index === 0 && '| '}
                <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {link.label[locale]}
                </a>
                {' |'}{' '}
              </span>
            ))}
          </p>
        </div>

        <div className="bio">
          {locale === 'zh' ? <BioChinese /> : <BioEnglish />}
          <p>{ui.emailLine[locale]}</p>
        </div>
      </div>
    </header>
  )
}
