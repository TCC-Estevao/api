export default function normalizeIPAddress(ip: string): string {
  // Verifica se é o formato ::ffff:127.0.0.1
  if (ip.startsWith('::ffff:')) {
    return ip.substr(7); // Remove '::ffff:'
  }
  return ip;
}
