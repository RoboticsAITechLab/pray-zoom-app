# <p align="center">Pray-zoom</p>

<p align="center">A customized Jitsi Meet platform designed specifically for prayer meetings, religious gatherings, and educational sessions with enhanced safety features, role management, and attendance tracking.</p>

<hr />

<p align="center">
<img src="https://raw.githubusercontent.com/jitsi/jitsi-meet/master/readme-img1.png" width="900" />
</p>

<hr />

## ✨ Custom Features

Pray-zoom extends Jitsi Meet with specialized features for religious and educational use:

### 🛡️ Safety Features
- **End Meeting Confirmation**: 3-second countdown before ending meetings for all participants
- **Exam Mode Confirmation**: Prevents accidental activation of exam restrictions
- **Role Change Warnings**: Safe role transitions with confirmation dialogs
- **Mode Change Alerts**: Clear warnings when switching between different meeting modes

### 👥 Role Management
- **Host/Moderator**: Full control over meeting settings and participants
- **Participant**: Standard meeting access with limited controls
- **Viewer**: Read-only access for observation
- **Custom Roles**: Flexible role assignment system

### 📊 Attendance Tracking
- **Real-time Attendance**: Track participant join/leave times
- **CSV Export**: Download attendance reports with timestamps
- **Duration Tracking**: Monitor individual participation time
- **Mode-based Reporting**: Track attendance by meeting mode

### 🙏 Prayer Panel
- **Prayer Requests**: Submit and display prayer requests
- **Prayer Timer**: Built-in prayer timing features
- **Scripture Sharing**: Share and highlight religious texts
- **Prayer Groups**: Organize participants by prayer groups

### 📝 Exam Mode
- **Secure Testing**: Lock down meeting during examinations
- **Screen Sharing Control**: Prevent unauthorized sharing
- **Chat Restrictions**: Control communication during tests
- **Participant Monitoring**: Enhanced monitoring capabilities

### 🔗 Room Links
- **Persistent Links**: Create permanent meeting links
- **Link Management**: Organize and share meeting URLs
- **Access Control**: Set link permissions and expiration

### 🎯 Unified Panel
- **Integrated Controls**: All features in one accessible panel
- **Quick Actions**: Fast access to common functions
- **Customizable Layout**: Arrange features as needed

## 🚀 Quick Start

### Using Pray-zoom Online
Visit [meet.jit.si](https://meet.jit.si) and create a meeting. All custom features are available through the interface.

### Mobile Apps
| Android | Android (F-Droid) | iOS |
|:-:|:-:|:-:|
| [<img src="resources/img/google-play-badge.png" height="50">](https://play.google.com/store/apps/details?id=org.jitsi.meet) | [<img src="resources/img/f-droid-badge.png" height="50">](https://f-droid.org/packages/org.jitsi.meet/) | [<img src="resources/img/appstore-badge.png" height="50">](https://itunes.apple.com/us/app/jitsi-meet/id1165103905) |

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/RoboticsAITechLab/pray-zoom-app.git
cd pray-zoom-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the project:**
```bash
make
```

4. **Start development server:**
```bash
npm start
```

### Development Commands

```bash
# Lint code
npm run lint

# Type checking
npm run tsc:web

# Build for production
make

# Run tests
npm test
```

## 🐳 Docker Deployment

For production deployment, use the official Jitsi Docker setup:

```bash
# Clone Jitsi Docker repo
git clone https://github.com/jitsi/docker-jitsi-meet
cd docker-jitsi-meet

# Copy environment file
cp env.example .env

# Edit .env with your domain and settings
nano .env

# Start services
docker-compose up -d
```

## 📋 Configuration

### Custom Features Configuration

Edit `interface_config.js` and `config.js` to customize:

- Safety timeouts
- Role permissions
- Attendance settings
- UI customizations

### Environment Variables

Create a `.env` file for local development:

```env
# Add your environment variables here
NODE_ENV=development
```

## 🎨 Customization

### Branding
- Replace `images/logo.svg` with your logo
- Update colors in `css/_variables.scss`
- Modify `title.html` for custom page titles

### Features
- Enable/disable features in `config.js`
- Customize UI in `interface_config.js`
- Modify feature behavior in respective component files

## 📖 Documentation

- [Jitsi Handbook](https://jitsi.github.io/handbook/) - Official documentation
- [API Documentation](./doc/api.md) - Custom API docs
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🔒 Security

Pray-zoom inherits all security features from Jitsi Meet:

- End-to-End Encryption (E2EE)
- Secure WebRTC connections
- Privacy-focused design

For security details, see [SECURITY.md](./SECURITY.md)

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](./CONTRIBUTING.md).

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built on [Jitsi Meet](https://github.com/jitsi/jitsi-meet) - Open source video conferencing
- Enhanced for religious and educational communities
- Maintained by RoboticsAITechLab

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/RoboticsAITechLab/pray-zoom-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/RoboticsAITechLab/pray-zoom-app/discussions)
- **Documentation**: [Jitsi Handbook](https://jitsi.github.io/handbook/)

---

<p align="center">
Built with ❤️ for the community by <a href="https://github.com/RoboticsAITechLab" target="_blank">RoboticsAITechLab</a>
</p>

<p align="center">
⭐ Star this repo if you find it useful!
</p>
