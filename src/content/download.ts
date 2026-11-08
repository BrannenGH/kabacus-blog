import { site } from "./site";

export interface DownloadOption {
  title: string;
  body: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  command?: string;
}

export const available: readonly DownloadOption[] = [
  {
    title: "Linux app (RPM and DEB)",
    body: "The KDE app and kabacus-cli in one native package, built against your distribution’s Qt and Kirigami. The rolling latest release follows every push to master. It registers the .kabacus file type.",
    links: [{ label: "Latest release on GitHub", href: site.releasesUrl }],
    command: "sudo zypper install ./kabacus-*.rpm   # openSUSE Tumbleweed\nsudo apt install ./kabacus-*.deb       # Debian",
  },
  {
    title: "Package repository",
    body: "Fedora 43–45, CentOS Stream 9–10, RHEL-compatible 9–10 (with EPEL), openSUSE Leap 16 and Tumbleweed get RPMs from the repository at repo.hallb.me, for x86_64. MicroOS, Aeon and Kalpa use the Tumbleweed RPM.",
    links: [{ label: "repo.hallb.me", href: "https://repo.hallb.me" }],
  },
  {
    title: "Server (container image)",
    body: "kabacus-server serves shared books over an HTTP API and an MCP endpoint, and hosts the web app at /app/. The image holds no settings for any one machine.",
    links: [{ label: "Container image on GitHub", href: "https://github.com/BrannenGH/kabacus/pkgs/container/kabacus-server" }],
    command: "podman pull ghcr.io/brannengh/kabacus-server:latest",
  },
];

export const comingSoon: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "Web app and desktop shell",
    body: "The web app runs from a server at /app/ today. Windows, macOS, Flatpak and Android builds of the desktop shell are built by the project’s CI but not yet published for download.",
  },
  {
    title: "Not planned",
    body: "RHEL 8, SUSE Linux Enterprise, openSUSE Leap 15 and aarch64 have no packages: the platforms either lack Qt 6 and KDE Frameworks 6 or are out of support.",
  },
];
