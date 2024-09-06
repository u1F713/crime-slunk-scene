{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    inherit (nixpkgs.lib) genAttrs;
    supportedSystems = [
      "x86_64-linux"
      "x86_64-darwin"
      "aarch64-linux"
      "aarch64-darwin"
    ];
    forEachSupportedSystem = f:
      genAttrs supportedSystems (system:
        f {
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    devShells = forEachSupportedSystem (
      {pkgs}: {
        default = pkgs.mkShell {
          packages = with pkgs; [nodejs_latest pnpm biome];

          BIOME_BINARY = "${pkgs.biome}/bin/biome";
          PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.browsers;
        };
      }
    );
    formatter = forEachSupportedSystem ({pkgs}: pkgs.alejandra);
  };
}
